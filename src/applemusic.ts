export async function searchAppleMusic(term: string, entity: string): Promise<any> {
    const response = await fetch(`https://itunes.apple.com/search?term=${term}&entity=${entity}`);
    return await response.json();
}