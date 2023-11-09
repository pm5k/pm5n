// TODO: see if this could be done in a nicer way, perhaps with preprocessing being hoisted out of these methods.
// alternatively, could use stores for some of this stuff..?
const saveExpansion = async (expansion, imageData, imageName, callback) => {
    let processed_tags = []
    if (typeof expansion.tags === "string") {
        processed_tags = expansion.tags.split(",").map((tag) => { return { name: tag.trim() } })
    } else if (Array.isArray(expansion.tags)) {
        processed_tags = expansion.tags.map((tag) => { return { name: tag.trim() } })
    } else {
        processed_tags = expansion.tags
    }

    let payload = {
        ...expansion,
        tags: processed_tags,
    }
    if (imageData) {
        payload.image_data = imageData.split(",")[1]
        payload.img = imageName
    }

    const res = await fetch("/pm5n/expansions", {
        method: "PATCH",
        body: JSON.stringify(payload),
    })
    await callback(await res.json())
}

const deleteExpansion = async (expansion, callback) => {
    const res = await fetch(`/pm5n/expansions/${expansion.id}`, {
        method: "DELETE",
    })
    await callback(await res.json())
}

const fetchExpansions = async (searchTerm, limit = 5, offset = 1, sort = "ASC") => {
    const filter = JSON.stringify({ search_term: searchTerm, limit, offset, sort })
    const res = await fetch("/pm5n/expansions/search", { method: "POST", body: filter })
    const data = await res.json()
    return data
}

export { deleteExpansion, fetchExpansions, saveExpansion }

