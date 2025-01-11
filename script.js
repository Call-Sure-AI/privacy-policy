// Language-specific configurations
const languageConfig = {
    en: {
        title: "Privacy Policy",
        dateLocale: 'en-US',
        lastModified: "Last Modified:",
        effectiveDate: "Effective Date:",
        version: "Version"
    },
    es: {
        title: "Política de Privacidad",
        dateLocale: 'es-ES',
        lastModified: "Última Modificación:",
        effectiveDate: "Fecha Efectiva:",
        version: "Versión"
    },
    ar: {
        title: "سياسة الخصوصية",
        dateLocale: 'ar-SA',
        lastModified: "آخر تعديل:",
        effectiveDate: "تاريخ السريان:",
        version: "الإصدار"
    },
    hi: {
        title: "गोपनीयता नीति",
        dateLocale: 'hi-IN',
        lastModified: "अंतिम संशोधन:",
        effectiveDate: "प्रभावी तिथि:",
        version: "संस्करण"
    },
    fr: {
        title: "Politique de Confidentialité",
        dateLocale: 'fr-FR',
        lastModified: "Dernière Modification :",
        effectiveDate: "Date d'Entrée en Vigueur :",
        version: "Version"
    },
    de: {
        title: "Datenschutzerklärung",
        dateLocale: 'de-DE',
        lastModified: "Zuletzt Geändert:",
        effectiveDate: "Gültig ab:",
        version: "Version"
    }
};

// Function to change language and load content
function changeLanguage() {
    const selectedLang = document.getElementById("languageSelect").value;
    const contentContainer = document.getElementById("dynamicContent");
    const headerTitle = document.getElementById("headerTitle");
    const config = languageConfig[selectedLang];

    // Map language codes to file paths
    const langFiles = {
        en: "./content/privacy-policy-en.html",
        es: "./content/privacy-policy-es.html",
        ar: "./content/privacy-policy-ar.html",
        hi: "./content/privacy-policy-hi.html",
        fr: "./content/privacy-policy-fr.html",
        de: "./content/privacy-policy-de.html"
    };

    // Update document language, title and direction
    document.documentElement.lang = selectedLang;
    document.documentElement.dir = selectedLang === 'ar' ? 'rtl' : 'ltr';
    headerTitle.textContent = config.title;
    document.title = `${config.title} - Callsure AI`;

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
            // Update dates after content is loaded
            updateDates(selectedLang);
        })
        .catch(error => {
            console.error("Error loading language content:", error);
            contentContainer.innerHTML = `<p>Error loading content. Please try again later.</p>`;
        });
}

// Function to format date based on locale
function formatDate(date, locale) {
    return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Function to update dates with proper localization
function updateDates(lang) {
    const config = languageConfig[lang];
    const today = new Date();
    
    const lastModified = new Date(today);
    lastModified.setDate(lastModified.getDate() - 35);
    
    const effectiveDate = new Date(today);
    effectiveDate.setDate(effectiveDate.getDate() - 21);

    // Format and update dates in the correct locale
    const formattedLastModified = formatDate(lastModified, config.dateLocale);
    const formattedEffectiveDate = formatDate(effectiveDate, config.dateLocale);

    // Find and update all date elements
    const lastModifiedElements = document.querySelectorAll('.last-modified');
    const effectiveDateElements = document.querySelectorAll('.effective-date');
    const versionElements = document.querySelectorAll('.version');

    lastModifiedElements.forEach(el => {
        el.innerHTML = `${config.lastModified} ${formattedLastModified}`;
    });

    effectiveDateElements.forEach(el => {
        el.innerHTML = `${config.effectiveDate} ${formattedEffectiveDate}`;
    });

    versionElements.forEach(el => {
        el.innerHTML = `${config.version} 3.0`;
    });
}

// Initialize on page load
window.onload = function() {
    // Set default language (English) and load content
    document.getElementById('languageSelect').value = 'en';
    changeLanguage();
};