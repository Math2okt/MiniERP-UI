//Get and generate DOM functions
function getDOMElement(id: string): HTMLElement | null {
    return document.getElementById(id);
}

function createDOMElement(type: string): HTMLElement {
    return document.createElement(type);
}

//Local storage interaction
function saveData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadData<T = any>(key: string = "token"): T {
    const stored = localStorage.getItem(key);

    if (!stored) {
        // Si no existe nada, devolvemos un valor por defecto adecuado
        return [] as T;
    }

    try {
        return JSON.parse(stored) as T;
    } catch {
        return [] as T;
    }
}
function throwNotification(text:string, success:boolean, duration:number = 3000) {
    const msg :HTMLElement | null = getDOMElement("notification");
    msg!.textContent = text;
    msg!.className = `position-fixed top-0 start-50 translate-middle-x p-3 rounded shadow text-white ${success ? "bg-success" : "bg-danger"}`;
    msg!.style.display = "block";
    setTimeout(() => {
        msg!.style.display = "none";
    }, duration);
}
// Export
export default { getDOMElement, createDOMElement, saveData, loadData, throwNotification };

// function addData(key: string, data: string) {
//     let collection = loadData(key);
//     collection = [...collection, data];
//     saveData(key, collection);
// }

// function deleteData(key: string, data: string) {
//     let collection = loadData(key) || [];
//     collection = collection.filter(e => e.id !== data.id);
//     saveData(key, collection);
// }
