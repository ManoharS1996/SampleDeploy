const timezoneCurrencyMap = {
    // North America
    'America/New_York': 'USD',        // United States Dollar
    'America/Los_Angeles': 'USD',     // United States Dollar
    'America/Chicago': 'USD',         // United States Dollar
    'America/Denver': 'USD',          // United States Dollar
    'America/Phoenix': 'USD',         // United States Dollar
    'America/Indianapolis': 'USD',    // United States Dollar
    'America/Atlanta': 'USD',         // United States Dollar
    'America/Detroit': 'USD',         // United States Dollar
    'America/Winnipeg': 'CAD',        // Canadian Dollar
    'America/Toronto': 'CAD',         // Canadian Dollar
    'America/Halifax': 'CAD',         // Canadian Dollar
    'America/St_Johns': 'CAD',        // Canadian Dollar
    'America/Sao_Paulo': 'BRL',       // Brazilian Real

    // Europe
    'Europe/London': 'GBP',           // British Pound Sterling
    'Europe/Berlin': 'EUR',           // Euro
    'Europe/Paris': 'EUR',            // Euro
    'Europe/Madrid': 'EUR',           // Euro
    'Europe/Rome': 'EUR',             // Euro
    'Europe/Amsterdam': 'EUR',        // Euro
    'Europe/Brussels': 'EUR',         // Euro
    'Europe/Stockholm': 'SEK',        // Swedish Krona
    'Europe/Oslo': 'NOK',             // Norwegian Krone
    'Europe/Copenhagen': 'DKK',       // Danish Krone
    'Europe/Helsinki': 'EUR',         // Euro
    'Europe/Budapest': 'HUF',         // Hungarian Forint
    'Europe/Istanbul': 'TRY',          // Turkish Lira
    'Europe/Zagreb': 'HRK',           // Croatian Kuna
    'Europe/Ljubljana': 'EUR',        // Euro
    'Europe/Prague': 'CZK',           // Czech Koruna
    'Europe/Sofia': 'BGN',            // Bulgarian Lev
    'Europe/Minsk': 'BYN',            // Belarusian Ruble
    'Europe/Tallinn': 'EUR',          // Euro
    'Europe/Riga': 'EUR',             // Euro
    'Europe/Vilnius': 'EUR',          // Euro

    // Asia
    'Asia/Tokyo': 'JPY',              // Japanese Yen
    'Asia/Shanghai': 'CNY',           // Chinese Yuan Renminbi
    'Asia/Hong_Kong': 'HKD',          // Hong Kong Dollar
    'Asia/Singapore': 'SGD',          // Singapore Dollar
    'Asia/Seoul': 'KRW',              // South Korean Won
    'Asia/Bangkok': 'THB',            // Thai Baht
    'Asia/Manila': 'PHP',             // Philippine Peso
    'Asia/Kolkata': 'INR',            // Indian Rupee
    'Asia/Jakarta': 'IDR',            // Indonesian Rupiah
    'Asia/Kuala_Lumpur': 'MYR',       // Malaysian Ringgit
    'Asia/Taipei': 'TWD',             // New Taiwan Dollar
    'Asia/Vietnam': 'VND',            // Vietnamese Dong
    'Asia/Almaty': 'KZT',             // Kazakhstani Tenge
    'Asia/Calcutta': 'INR',           // Indian Rupee
    'Asia/Tehran': 'IRR',             // Iranian Rial
    'Asia/Yerevan': 'AMD',            // Armenian Dram
    'Asia/Tashkent': 'UZS',           // Uzbekistani Som
    'Asia/Dhaka': 'BDT',              // Bangladeshi Taka

    // Australia and Pacific
    'Australia/Sydney': 'AUD',        // Australian Dollar
    'Australia/Melbourne': 'AUD',     // Australian Dollar
    'Australia/Brisbane': 'AUD',      // Australian Dollar
    'Australia/Perth': 'AUD',         // Australian Dollar
    'Australia/Adelaide': 'AUD',      // Australian Dollar
    'Australia/Hobart': 'AUD',        // Australian Dollar
    'Pacific/Auckland': 'NZD',        // New Zealand Dollar
    'Pacific/Fiji': 'FJD',            // Fijian Dollar
    'Pacific/Port_Moresby': 'PGK',    // Papua New Guinean Kina
    'Pacific/Guam': 'USD',            // United States Dollar
    'Pacific/Apia': 'WST',            // Samoan Tala

    // Africa
    'Africa/Johannesburg': 'ZAR',     // South African Rand
    'Africa/Cairo': 'EGP',            // Egyptian Pound
    'Africa/Nairobi': 'KES',          // Kenyan Shilling
    'Africa/Accra': 'GHS',            // Ghanaian Cedi
    'Africa/Lagos': 'NGN',            // Nigerian Naira
    'Africa/Kampala': 'UGX',          // Ugandan Shilling
    'Africa/Douala': 'XAF',           // Central African CFA Franc
    'Africa/Harare': 'ZWL',           // Zimbabwean Dollar
    'Africa/Algiers': 'DZD',          // Algerian Dinar
    'Africa/Maputo': 'MZN',           // Mozambican Metical

    // Middle East
    'Asia/Dubai': 'AED',              // United Arab Emirates Dirham
    'Asia/Jerusalem': 'ILS',          // Israeli New Shekel
    'Asia/Beirut': 'LBP',             // Lebanese Pound
    'Asia/Baghdad': 'IQD',            // Iraqi Dinar
    'Asia/Amman': 'JOD',              // Jordanian Dinar
    'Asia/Doha': 'QAR',               // Qatari Rial

    // Antarctica (for completeness)
    'Antarctica/Palmer': 'USD',       // United States Dollar
    'Antarctica/McMurdo': 'USD',      // United States Dollar
    'Antarctica/Vostok': 'RUB',       // Russian Ruble

    // Add more mappings as needed
};

export default timezoneCurrencyMap