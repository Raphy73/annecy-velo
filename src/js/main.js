document.addEventListener("DOMContentLoaded", () => {
    function includeHTML() {
        // Replaces "include-html" tag with the content of the file

        let all, i, el, file, xhttp;

        all = document.getElementsByTagName("*");
        for (i = 0; i < all.length; i++) {
            el = all[i];
            file = el.getAttribute("include-html");
            if (file) {
                /* Make an HTTP request using the attribute value as the file name: */
                xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                            el.innerHTML = this.responseText;
                        }
                        if (this.status === 404) {
                            el.innerHTML = "Page not found.";
                        }
                        /* Remove the attribute, and call this function once more: */
                        el.removeAttribute("include-html");
                        includeHTML();
                    }
                }
                xhttp.open("GET", file, true);
                xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
                xhttp.send();
                return;
            }
        }
    }

    includeHTML();
});