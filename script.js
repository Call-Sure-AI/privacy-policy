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

    // Update dates immediately
    updateDates(selectedLang);

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

// Function to format date based on locale
function formatDate(date, locale) {
    try {
        return date.toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        console.error('Error formatting date:', error);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// Function to update dates with proper localization
function updateDates(lang) {
    try {
        const config = languageConfig[lang];
        const today = new Date();
        
        const lastModified = new Date(today);
        lastModified.setDate(lastModified.getDate() - 35);
        
        const effectiveDate = new Date(today);
        effectiveDate.setDate(effectiveDate.getDate() - 21);

        // Get the date containers
        const lastModifiedContainer = document.querySelector('.last-modified-date');
        const effectiveDateContainer = document.querySelector('.effective-date-date');
        const versionContainer = document.querySelector('.version-number');

        if (lastModifiedContainer) {
            lastModifiedContainer.textContent = formatDate(lastModified, config.dateLocale);
        }

        if (effectiveDateContainer) {
            effectiveDateContainer.textContent = formatDate(effectiveDate, config.dateLocale);
        }

        if (versionContainer) {
            versionContainer.textContent = '3.0';
        }

        // Update the labels
        const lastModifiedLabel = document.querySelector('.last-modified');
        const effectiveDateLabel = document.querySelector('.effective-date');
        const versionLabel = document.querySelector('.version');

        if (lastModifiedLabel) {
            lastModifiedLabel.textContent = config.lastModified;
        }

        if (effectiveDateLabel) {
            effectiveDateLabel.textContent = config.effectiveDate;
        }

        if (versionLabel) {
            versionLabel.textContent = config.version;
        }

    } catch (error) {
        console.error('Error updating dates:', error);
    }
}

// Initialize when the page loads
window.onload = function() {
    // Set default language (English) and load content
    const select = document.getElementById('languageSelect');
    if (select) {
        select.value = 'en';
        changeLanguage();
    } else {
        console.error('Language selector not found');
    }
};