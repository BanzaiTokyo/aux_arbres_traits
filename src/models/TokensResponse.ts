export type TokenResponse = {
    items: [],
    next_page_params: {
        items_count: 50,
        unique_token: string
    }
}

export type SingleTokenType = {
    id: string;
    image_url: string;
}