
import Utilities from "./Utilities"


export class Requester {

    BASE_URL: string = "https://minierp.rbnetto.dev/api"
    TOKEN_ENDPOINT: string = "/token/"
    TOKEN_REFRESH_ENDPOINT: string = "/token/refresh/"
    MAX_REFRESH_RETRIES = 1;
    getLocalSTToken(): string {
        const token = Utilities.loadData("access_token");

        if (!token || typeof token !== "string") {
            console.warn("No se encontró el access_token en LocalStorage");
            return "";
        }

        return token;
    }

    getRefreshToken(): string {
        const refresh = Utilities.loadData("refresh_token");

        if (!refresh || typeof refresh !== "string") {
            console.warn("No se encontró el refresh_token en LocalStorage");
            return "";
        }

        return refresh;
    }


    getHeaders() {
        return {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.getLocalSTToken()
        };
    }

    async refreshToken(): Promise<boolean> {
        const body = { refresh: this.getRefreshToken() };
        try {
            const response = await fetch(this.BASE_URL + this.TOKEN_REFRESH_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (!response.ok) return false;

            const tokenJson = await response.json();
            Utilities.saveData("access_token", tokenJson.access_token);
            console.log("Token refrescado")
            return true;
        } catch (error) {
            console.error("Error refrescando token:", error);
            return false;
        }
    }

    async get<T>(endpoint: string, refreshRetries = 0): Promise<T> {
        const response = await fetch(this.BASE_URL + endpoint, {
            method: "GET",
            headers: this.getHeaders()
        });

        if (response.status === 401 && refreshRetries <= this.MAX_REFRESH_RETRIES) {
            const refreshed = await this.refreshToken();
            if (refreshed) return this.get<T>(endpoint, refreshRetries + 1);

            throw new Error("Error en reautenticación, token inválido o expirado");
        }

        if (!response.ok) {
            throw new Error(`Error en GET ${endpoint}: ${response.status} ${response.statusText}`);
        }

        const data: T = await response.json();
        return data;
    }



    async post<T>(endpoint: string, body: string, refreshRetries: number = 0, token: boolean = true): Promise<T> {
        const response = await fetch(this.BASE_URL + endpoint, {
            method: "POST",
            headers: token ? this.getHeaders() : { "Content-Type": "application/json" },
            body: body
        })

        if (response.status === 401 && refreshRetries < this.MAX_REFRESH_RETRIES) {
            const refreshed = await this.refreshToken();
            if (refreshed) return this.post(endpoint, body, refreshRetries + 1);

            Utilities.throwNotification("La sesion expiro", false, 5000)

            throw new Error("Error en reautenticación, token inválido o expirado");

        }
        if (!response.ok) {
            throw new Error(`Error en POST ${endpoint}, ${body}: ${response.status} ${response.statusText}`);
        }

        const data: T = await response.json();
        return data;


    }

    async put<T>(endpoint: string, body: string, refreshRetries: number = 0, token: boolean = true): Promise<T> {
        const response = await fetch(this.BASE_URL + endpoint, {
            method: "PUT",
            headers: token ? this.getHeaders() : { "Content-Type": "application/json" },
            body: body
        })

        if (response.status === 401 && refreshRetries < this.MAX_REFRESH_RETRIES) {
            const refreshed = await this.refreshToken();
            if (refreshed) return this.put(endpoint, body, refreshRetries + 1);
            throw new Error("Error en reautenticación, token inválido o expirado");
        }
        if (!response.ok) {
            throw new Error(`Error en PUT ${endpoint}, ${body}: ${response.status} ${response.statusText}`);
        }

        const data: T = await response.json();
        return data;
    }
    async delete(endpoint: string, refreshRetries: number = 0): Promise<boolean> {
        const response = await fetch(this.BASE_URL + endpoint, {
            method: "DELETE",
            headers: this.getHeaders()
        })
        if (response.status === 401 && refreshRetries < this.MAX_REFRESH_RETRIES) {
            const refreshed = await this.refreshToken();
            if (refreshed) return this.delete(endpoint, refreshRetries + 1);
            throw new Error("Error en reautenticación, token inválido o expirado");
        }
        if (!response.ok) {
            throw new Error(`Error en DELETE ${endpoint} ${response.status} ${response.statusText}`);
        }
        return response.ok
    }
}