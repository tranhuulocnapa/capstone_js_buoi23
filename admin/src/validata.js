class Validate {
    khongtrong(value, errorId, mess) {
        if (value === "") {
            document.getElementById(errorId).style.display = "block";
            document.getElementById(errorId).innerHTML = mess
            return false;

        }
        document.getElementById(errorId).style.display = "none";
        document.getElementById(errorId).innerHTML = "";

        return true;
    }
}

export default Validate;