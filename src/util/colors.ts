export const rtcwColorsMiddleWare = (alias_colored: string) => {
    // alias_colored = "^7do^1nka"
    alias_colored.replace("^^","^~"); //special case for double carrot
    if (alias_colored.charAt(0) != "^") {
        alias_colored = "^7" + alias_colored;
    }
    const nameTokens = alias_colored.split("^");
    const middleOutput : string[][] = [];
    if (nameTokens.length > 1) {
        nameTokens.map(function (token, index) {
            if (token.trim().length > 1) {
                let colorCode = token.charAt(0);
                switch(colorCode) {
                    case "~":
                        colorCode = "cr";
                    case "/":
                        colorCode = "sl";
                    case "*":
                        colorCode = "st";
                    case "-":
                        colorCode = "mi";
                    case "+":
                        colorCode = "pl";
                    case "?":
                        colorCode = "qu";
                    case "@":
                        colorCode = "at";
                    case ">":
                        colorCode = "mt";
                    case "<":
                        colorCode = "lt";
                }
            middleOutput.push(["c" + colorCode, token.substring(1)]);
            }
        });
    }
    else {
        middleOutput.push(["c7", nameTokens[0]]);
    }
    return middleOutput;
}
