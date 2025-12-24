function getCoffee(kind: string | number){

    if(typeof(kind) === "string")
            return "making @{kind} coffee";
    return "coffee order @{kind}";
}

function serveCoffee(msg?: string){

    if(msg) return "serving @{msg}";
    return "serving default coffee";
}

function orderCoffee(size: "small" | "medium" | "large" | number){

    //exhaustive check
    if(size === "small") return "processing a small cup of coffee!";
    if(size === "medium" || size === "large") return "processing a regular coffee...";
    return "coffee order @{size}";
}

class blackCoffee{

    serve(){
        return "serving a black coffee !";
    }
}
class whiteCoffee{

    serve(){
        return "serving a white coffee !";
    }
}

function serve(chai: blackCoffee | whiteCoffee){

    if(chai instanceof(blackCoffee)) return chai.serve();
}