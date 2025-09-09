const RAWG_API_KEY = "2707458730434671a88f66252b4d90b5";

//-----------Home Page--------------------
export async function top10games() {
    try {
        const response = await fetch(
            `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page_size=10&ordering=-rating`
        );
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Erro ao procurar top 10 games:", error);
        return [];
    }
}
export async function trending_games() {
    try {
        const response = await fetch(
            `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page_size=20&ordering=-added`
        );
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Erro ao procurar tendencias:", error);
        return [];
    }
}

export async function recommended_games() {
    try {
        const response = await fetch(
            `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page_size=20&ordering=-metacritic`
        );
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Erro ao procurar jogos recomendados:", error);
        return [];
    }
}

export async function new_releases() {
    try {
        const hoje = new Date().toISOString().split("T")[0];
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        const lastMonthStr = lastMonth.toISOString().split("T")[0];

        const response = await fetch(
            `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&dates=${lastMonthStr},${hoje}&ordering=-released&page_size=20`
        );
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Erro ao procurar novos lançamentos:", error);
        return [];
    }
}

//-------------------Library Page----------------

let seenGameIds = new Set<number>(); // evita repetir jogos

export async function fetchNextGames(limit = 20) {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page_size=${limit}&ordering=-added`
    );
    const data = await response.json();

    // Filtra apenas os jogos que ainda não foram retornados
    const newGames = data.results.filter((game: any) => !seenGameIds.has(game.id));

    // Marca os jogos como "vistos"
    newGames.forEach((game: any) => seenGameIds.add(game.id));

    return newGames;
  } catch (error) {
    console.error("Erro ao procurar jogos:", error);
    return [];
  }
}

// Para reiniciar a lista (quando sair da Library)
export function resetSeenGames() {
  seenGameIds.clear();
}

export async function getGameDetails(gameId: number | string) {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games/${gameId}?key=${RAWG_API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao procurar detalhes do jogo:", error);
    return null;
  }
}
export async function getGameScreenshots(gameId: number | string) {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games/${gameId}/screenshots?key=${RAWG_API_KEY}`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Erro ao buscar screenshots do jogo:", error);
    return [];
  }
}
