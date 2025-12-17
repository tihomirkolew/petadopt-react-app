import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";


export default function usePetRequest(url) {

    const { user, isAuthenticated } = useUserContext()
    const [fetchedData, setFetchedData] = useState([]);


    useEffect(() => {
        if (!url) return;

        const controller = new AbortController();

        const getData = async () => {
            try {
                const response = await fetch(url, { signal: controller.signal });
                const result = await response.json();
                setFetchedData(result)
            } catch (err) {
                if (err.name === "AbortError") {
                    return;
                }
                console.error("error fetching data:", err)
            } 
        };

        getData();

        return () => {
            controller.abort();
            console.log(`Cleanup ${url}`);
        };
    }, [url])

    const request = async (method, data, additionalUrl) => {
        let settings = {};
        let currentUrl = url;

        if (additionalUrl) {
            currentUrl = `${url}/${additionalUrl}`
        }

        if (method) {
            settings.method = method;
        }

        if (data) {
            settings.headers = {
                'Content-Type': 'application/json',
            }

            settings.body = JSON.stringify(data)
        }

        if (isAuthenticated) {
            settings.headers = {
                ...settings.headers,
                'X-Authorization': user?.accessToken,
            };
        }

        try {
            const response = await fetch(currentUrl, settings);

            if (!response.ok) {
                throw new Error('Failed to delete pet/like');
            }

            return await response.json();
        } catch (err) {
            console.error('Error deleting pet:', err);
            throw err;
        }
    }

    return {
        fetchedData,
        request
    }
}
