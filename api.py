import base64
import os
from io import BytesIO
from pathlib import Path

from aiohttp import web
from PIL import Image
from server import PromptServer
from sqlalchemy import literal

from pm5n.database import session
from pm5n.database.models.expansions import Expansion, Tag
from pm5n.database.schemas.expansions import PDExpansion, PDExpansionFilter
from pm5n.database.utils import upsert_expansion

UPLOAD_FOLDER = Path(os.path.abspath(__file__)).parent / "web/uploads"


@PromptServer.instance.routes.post("/pm5n/expansions/search")
async def list_expansions(request):
    expansion_filter = PDExpansionFilter(**await request.json())  # Pydantic validation
    with session() as sess:
        base_query = sess.query(Expansion)
        total_count_exp = base_query.count()
        total_count_tags = sess.query(Tag).count()
        total_found_exp = total_count_exp
        # FIXME: is this optimal?
        if expansion_filter.search_term:
            base_query = base_query.filter(
                literal(expansion_filter.search_term).contains(Expansion.trigger)
                | Expansion.trigger.contains(expansion_filter.search_term)
                | Expansion.tags.any(Tag.name.contains(expansion_filter.search_term))
            )
            # Update the total count for page calc is we are searching using terms..
            total_found_exp = base_query.count()

        # Paginating the query
        pages_total = total_found_exp // expansion_filter.limit + (
            total_found_exp % expansion_filter.limit > 0
        )
        offset = (expansion_filter.offset - 1) * expansion_filter.limit

        expansions = [
            exp.as_dict()
            for exp in base_query.order_by(
                Expansion.trigger.asc()
                if expansion_filter.sort == "ASC"
                else Expansion.trigger.desc()
            )
            .limit(expansion_filter.limit)
            .offset(offset)
            .all()
        ]
        return web.json_response(
            data={
                "expansions": expansions,
                "total_expansions": total_count_exp,
                "total_found": total_found_exp,
                "total_tags": total_count_tags,
                "total_pages": pages_total,
            }
        )


@PromptServer.instance.routes.patch("/pm5n/expansions")
async def upsert(request):
    expansion_data = PDExpansion(**await request.json())
    with session() as sess:
        try:
            upsert_expansion(sess, expansion_data)
            sess.commit()  # Commit the transaction
            if expansion_data.image_data:
                # Resize images to a max size of either 512x768 or 768x512
                image = Image.open(BytesIO(base64.b64decode(expansion_data.image_data)))
                width, height = image.size
                max_size = (768, 512) if width > height else (512, 768)
                image.thumbnail(max_size, Image.LANCZOS)

                image_filepath = UPLOAD_FOLDER / f"{expansion_data.img}"
                image.save(image_filepath)
            return web.json_response(
                data={
                    "message": f"Successfully upserted expansion - {expansion_data.trigger}."
                },
                status=200,
            )
        except Exception as err:
            return web.json_response(
                data={
                    "message": f"Could not upsert expansion: {expansion_data.trigger}.",
                    "error": err,
                },
                status=400,
            )


@PromptServer.instance.routes.delete("/pm5n/{model}/{id}")
async def delete_any(request):
    """
    Delete any model by id.

    Since the op is the same for all models, a generic endpoint is used.
    """
    model = request.match_info.get("model")
    _id = request.match_info.get("id")

    model_map = {
        "expansions": Expansion,
        "tags": Tag,
    }

    if model not in model_map:
        return web.json_response(
            data={
                # TODO: "{model} is not a valid database item.."
                "message": f"Model must be one of {list(model_map.keys())}. Got `{model}`."
            },
            status=400,
        )
    else:
        with session() as sess:
            try:
                to_delete = sess.query(model_map[model]).filter_by(id=_id).one_or_none()
                sess.delete(to_delete)
                sess.commit()
            except Exception:
                return web.json_response(
                    data={"message": f"Could not delete '{model}' with id {_id}."},
                    status=404,
                )
        return web.json_response(
            data={"message": f"Deleted '{model}' with id {_id}."},
            status=200,
        )
