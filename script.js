// Function to change language and load content
function changeLanguage() {
    const selectedLang = document.getElementById("languageSelect").value;
    const contentContainer = document.getElementById("dynamicContent");
    const headerTitle = document.getElementById("headerTitle");

    // Map language codes to file paths
    const langFiles = {
        en: "./content/privacy-policy-en.html",
        es: "./content/privacy-policy-es.html",
        ar: "./content/privacy-policy-ar.html",
        hi: "./content/privacy-policy-hi.html",
        fr: "./content/privacy-policy-fr.html",
        de: "./content/privacy-policy-de.html"
    };

    // Map language codes to titles
    const titles = {
        en: "Privacy Policy",
        es: "Política de Privacidad",
        ar: "سياسة الخصوصية",
        hi: "गोपनीयता नीति",
        fr: "Politique de Confidentialité",
        de: "Datenschutzerklärung"
    };

    // Update page title and direction
    headerTitle.textContent = titles[selectedLang];
    document.documentElement.dir = selectedLang === 'ar' ? 'rtl' : 'ltr';

    // Fetch and load content
    fetch(langFiles[selectedLang])
        .then(response => {
            if (!response.ok) {
                throw new Error("Error loading content");
            }
            return response.text();
        })
        .then(data => {
            contentContainer.innerHTML = data;
        })
        .catch(error => {
            console.error("Error loading language content:", error);
            contentContainer.innerHTML = `<p>Error loading content. Please try again later.</p>`;
        });
}

// Function to format date as Month DD, YYYY
function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}

// Set last modified and effective dates
window.onload = function () {
    const today = new Date();
    const lastModified = new Date(today);
    lastModified.setDate(lastModified.getDate() - 35);
    document.getElementById('lastModified').textContent = formatDate(lastModified);

    const effectiveDate = new Date(today);
    effectiveDate.setDate(effectiveDate.getDate() - 21);
    document.getElementById('effectiveDate').textContent = formatDate(effectiveDate);

    // Load English content by default
    changeLanguage();
};