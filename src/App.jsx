import React, { useState, useCallback, useRef } from 'react';

// Helper component for consistent input fields
const FormInput = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input 
      {...props}
      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-400"
    />
  </div>
);

// Main Application Component
export default function App() {
  // Grouped state for better organization
  const [details, setDetails] = useState({
    title: "🔥 Huge Summer Sale! 🔥",
    description: "Don't miss out on our biggest sale of the season. Get up to 50% off on selected items. Limited time only!",
    bannerImage: "https://placehold.co/600x300/6366f1/ffffff?text=Your+Banner+Here",
  });

  const [company, setCompany] = useState({
    name: "Your Company",
    logoUrl: "https://placehold.co/150x50/cccccc/333333?text=Your+Logo",
    websiteUrl: "https://example.com",
    emailAddress: "contact@example.com",
  });

  const [socials, setSocials] = useState({
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
  });

  const [products, setProducts] = useState([
    { name: "Product 1", price: "19.99", discount: "50", image: "https://placehold.co/300x300/e0e0e0/555555?text=Product+1", url: "https://example.com/product1" },
  ]);

  const [style, setStyle] = useState({
    accentColor: "#6366f1",
    darkMode: false,
  });

  const [emailHtml, setEmailHtml] = useState("");
  const [copySuccess, setCopySuccess] = useState('');
  const fileInputRef = useRef(null);

  // Handlers using useCallback for performance
  const handleDetailChange = useCallback((field, value) => {
    setDetails(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleCompanyChange = useCallback((field, value) => {
    setCompany(prev => ({ ...prev, [field]: value }));
  }, []);
  
  const handleSocialChange = useCallback((field, value) => {
    setSocials(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleStyleChange = useCallback((field, value) => {
    setStyle(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleProductChange = useCallback((index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  }, [products]);

  const addProduct = () => {
    setProducts([...products, { name: "", price: "", discount: "", image: "", url: "" }]);
  };
  
  const removeProduct = (index) => {
    if (products.length <= 1) return; // Prevent removing the last product
    setProducts(products.filter((_, i) => i !== index));
  };

  const generateEmailHtml = useCallback(() => {
    const { accentColor, darkMode } = style;
    // Define colors based on dark/light mode
    const bodyBgColor = darkMode ? "#121212" : "#f3f4f6";
    const contentBgColor = darkMode ? "#1e1e1e" : "#ffffff";
    const textColor = darkMode ? "#e5e7eb" : "#111827";
    const lightTextColor = darkMode ? "#9ca3af" : "#4b5563";
    const borderColor = darkMode ? '#374151' : '#e5e7eb';

    // Define a web-safe font stack for maximum compatibility
    const fontStack = "Arial, 'Helvetica Neue', Helvetica, sans-serif";

    // This HTML is structured for maximum email client compatibility (like Zoho and Outlook).
    // It uses a table-based layout, inlined CSS, and conditional comments.
    const email = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>${details.title}</title>
  <!--[if mso]>
  <style>
    * {
      font-family: sans-serif !important;
    }
  </style>
  <![endif]-->
  <style>
    html, body {
      margin: 0 auto !important;
      padding: 0 !important;
      height: 100% !important;
      width: 100% !important;
      background: ${bodyBgColor};
    }
    * {
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }
    .main-container {
      width: 600px;
    }
    @media screen and (max-width: 600px) {
      .main-container {
        width: 100% !important;
      }
      .product-image-container {
          width: 120px !important;
      }
      .product-image {
          width: 120px !important;
          height: auto !important;
      }
    }
  </style>
</head>
<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: ${bodyBgColor};">
  <center style="width: 100%; background-color: ${bodyBgColor};">
    <!--[if mso | IE]>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
    <![endif]-->
    <div style="max-width: 600px; margin: 0 auto;" class="main-container">
      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto; background: ${contentBgColor};">
        ${details.bannerImage ? `
        <tr>
          <td style="padding: 0;">
            <img src="${details.bannerImage}" width="600" alt="Promotional Banner" border="0" style="width: 100%; max-width: 600px; height: auto; display: block;">
          </td>
        </tr>` : ''}
        <tr>
          <td style="padding: 20px 30px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
              <tr>
                <td align="center" style="padding-bottom: 20px;">
                  <img src="${company.logoUrl}" width="150" alt="${company.name} Logo" border="0" style="max-width: 150px; height: auto; display: block;">
                </td>
              </tr>
              <tr>
                <td align="center" style="font-family: ${fontStack}; font-size: 28px; font-weight: bold; color: ${accentColor}; padding-bottom: 16px;">
                  ${details.title}
                </td>
              </tr>
              <tr>
                <td align="center" style="font-family: ${fontStack}; font-size: 16px; line-height: 1.5; color: ${textColor}; padding-bottom: 24px;">
                  ${details.description}
                </td>
              </tr>
              
              <!-- Products Section -->
              ${products.map(p => `
                <tr>
                  <td style="padding-bottom: 24px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="150" valign="top" class="product-image-container">
                          <img src="${p.image}" width="150" height="150" alt="${p.name}" border="0" class="product-image" style="width: 150px; height: 150px; object-fit: cover; border-radius: 8px; display: block;">
                        </td>
                        <td valign="top" style="padding-left: 20px; font-family: ${fontStack};">
                          <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">
                            <a href="${p.url}" target="_blank" style="color: ${accentColor}; text-decoration: none;">${p.name}</a>
                          </div>
                          <div style="font-size: 20px; font-weight: bold; color: ${accentColor}; margin-bottom: 4px;">
                            $${p.price}
                            ${p.discount ? `<span style="font-size: 14px; text-decoration: line-through; color: ${lightTextColor}; font-weight: normal; margin-left: 8px;">$${(p.price / (1 - p.discount / 100)).toFixed(2)}</span>` : ''}
                          </div>
                          ${p.discount ? `<div style="font-size: 14px; color: ${lightTextColor};">(${p.discount}% off)</div>` : ''}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              `).join("")}

              <!-- Footer -->
              <tr>
                <td align="center" style="border-top: 1px solid ${borderColor}; padding-top: 24px; font-family: ${fontStack}; color: ${lightTextColor}; font-size: 14px;">
                  <p style="margin: 0 0 16px 0;">Thanks for shopping with <strong>${company.name}</strong>!</p>
                  <p style="margin: 0 0 16px 0;">
                    <a href="${company.websiteUrl}" target="_blank" style="color: ${accentColor}; text-decoration: none;">Visit our website</a> &nbsp;|&nbsp; <a href="mailto:${company.emailAddress}" style="color: ${accentColor}; text-decoration: none;">Contact Us</a>
                  </p>
                  <div style="padding-top: 8px;">
                    ${socials.facebook ? `<a href="${socials.facebook}" target="_blank" style="display: inline-block; padding: 0 8px;"><img src="https://i.ibb.co/L9X3wcn/facebook.png" width="24" height="24" alt="Facebook" border="0"></a>` : ''}
                    ${socials.instagram ? `<a href="${socials.instagram}" target="_blank" style="display: inline-block; padding: 0 8px;"><img src="https://i.ibb.co/yVw0f2D/instagram.png" width="24" height="24" alt="Instagram" border="0"></a>` : ''}
                    ${socials.linkedin ? `<a href="${socials.linkedin}" target="_blank" style="display: inline-block; padding: 0 8px;"><img src="https://i.ibb.co/dKq2r3j/linkedin.png" width="24" height="24" alt="LinkedIn" border="0"></a>` : ''}
                    ${socials.youtube ? `<a href="${socials.youtube}" target="_blank" style="display: inline-block; padding: 0 8px;"><img src="https://i.ibb.co/31b1A0p/youtube.png" width="24" height="24" alt="YouTube" border="0"></a>` : ''}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
    <!--[if mso | IE]>
    </td>
    </tr>
    </table>
    <![endif]-->
  </center>
</body>
</html>`;
    setEmailHtml(email);
  }, [details, company, socials, products, style]);
  
  const copyHtmlToClipboard = () => {
    const textarea = document.createElement('textarea');
    textarea.value = emailHtml;
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
        setCopySuccess('Failed to copy');
    }
    document.body.removeChild(textarea);
  };

  // Export all data to a CSV file
  const exportCSV = useCallback(() => {
    const dataToExport = {
      ...details,
      ...company,
      ...socials,
      ...style,
      products: JSON.stringify(products),
    };

    const headers = Object.keys(dataToExport);
    const values = headers.map(header => {
      const value = dataToExport[header];
      return `"${String(value).replace(/"/g, '""')}"`;
    });

    const csvContent = [headers.join(','), values.join(',')].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'email-promotion-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [details, company, socials, products, style]);

  // Import data from a CSV file
  const importCSV = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const lines = text.split('\n');
        if (lines.length < 2) throw new Error("Invalid CSV format");

        const headers = lines[0].split(',');
        const values = lines[1].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g).map(v => v.replace(/^"|"$/g, '').replace(/""/g, '"'));

        if (headers.length !== values.length) throw new Error("CSV header and value mismatch");

        const importedData = headers.reduce((obj, header, index) => {
          obj[header] = values[index];
          return obj;
        }, {});

        setDetails({
          title: importedData.title || '',
          description: importedData.description || '',
          bannerImage: importedData.bannerImage || '',
        });
        setCompany({
          name: importedData.name || '',
          logoUrl: importedData.logoUrl || '',
          websiteUrl: importedData.websiteUrl || '',
          emailAddress: importedData.emailAddress || '',
        });
        setSocials({
          facebook: importedData.facebook || '',
          instagram: importedData.instagram || '',
          linkedin: importedData.linkedin || '',
          youtube: importedData.youtube || '',
        });
        setStyle({
          accentColor: importedData.accentColor || '#6366f1',
          darkMode: importedData.darkMode === 'true',
        });
        setProducts(JSON.parse(importedData.products || '[]'));
        
        alert('Promotion data imported successfully!');
      } catch (error) {
        console.error("Failed to import CSV:", error);
        alert(`Failed to import CSV. Please ensure it's a valid file exported from this tool. Error: ${error.message}`);
      }
    };
    reader.readAsText(file);
    event.target.value = null;
  }, []);


  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Promotional Email Generator
          </h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Form Inputs */}
          <div className="lg:col-span-5 space-y-6">
            {/* General Settings */}
            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">General Settings</h3>
              <div className="space-y-4">
                <FormInput label="Promotion Title" value={details.title} onChange={e => handleDetailChange('title', e.target.value)} />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea value={details.description} onChange={e => handleDetailChange('description', e.target.value)} rows="4" className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-400"></textarea>
                </div>
                <FormInput label="Banner Image URL" value={details.bannerImage} onChange={e => handleDetailChange('bannerImage', e.target.value)} />
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Company Info</h3>
              <div className="space-y-4">
                <FormInput label="Company Name" value={company.name} onChange={e => handleCompanyChange('name', e.target.value)} />
                <FormInput label="Logo URL" value={company.logoUrl} onChange={e => handleCompanyChange('logoUrl', e.target.value)} />
                <FormInput label="Website URL" value={company.websiteUrl} onChange={e => handleCompanyChange('websiteUrl', e.target.value)} />
                <FormInput label="Contact Email" type="email" value={company.emailAddress} onChange={e => handleCompanyChange('emailAddress', e.target.value)} />
              </div>
            </div>

            {/* Products */}
            <div className="bg-white p-5 rounded-lg shadow">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Products</h3>
                <div className="space-y-4">
                    {products.map((product, index) => (
                        <div key={index} className="border p-4 rounded-md space-y-3 relative">
                            <h4 className="font-semibold text-gray-600">Product {index + 1}</h4>
                            <FormInput label="Product Name" value={product.name} onChange={e => handleProductChange(index, 'name', e.target.value)} />
                            <div className="grid grid-cols-2 gap-4">
                                <FormInput label="Sale Price ($)" type="number" value={product.price} onChange={e => handleProductChange(index, 'price', e.target.value)} />
                                <FormInput label="Discount (%)" type="number" value={product.discount} onChange={e => handleProductChange(index, 'discount', e.target.value)} />
                            </div>
                            <FormInput label="Product Image URL" value={product.image} onChange={e => handleProductChange(index, 'image', e.target.value)} />
                            <FormInput label="Product URL" value={product.url} onChange={e => handleProductChange(index, 'url', e.target.value)} />
                            {products.length > 1 && (
                                <button onClick={() => removeProduct(index)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                                </button>
                            )}
                        </div>
                    ))}
                    <button onClick={addProduct} className="w-full bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-200 font-semibold">Add Product</button>
                </div>
            </div>

            {/* Style & Socials */}
            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Style & Socials</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Accent Color</label>
                  <input type="color" value={style.accentColor} onChange={e => handleStyleChange('accentColor', e.target.value)} className="w-10 h-10 border-none cursor-pointer rounded-md" />
                </div>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" checked={style.darkMode} onChange={() => handleStyleChange('darkMode', !style.darkMode)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                  <span className="text-sm font-medium text-gray-700">Dark Mode Email</span>
                </label>
                <div className="grid grid-cols-2 gap-4 pt-2">
                    <FormInput label="Facebook URL" value={socials.facebook} onChange={e => handleSocialChange('facebook', e.target.value)} />
                    <FormInput label="Instagram URL" value={socials.instagram} onChange={e => handleSocialChange('instagram', e.target.value)} />
                    <FormInput label="LinkedIn URL" value={socials.linkedin} onChange={e => handleSocialChange('linkedin', e.target.value)} />
                    <FormInput label="YouTube URL" value={socials.youtube} onChange={e => handleSocialChange('youtube', e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Preview & Actions */}
          <div className="lg:col-span-7 mt-6 lg:mt-0">
            <div className="bg-white p-5 rounded-lg shadow sticky top-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Preview & Actions</h3>
              <button onClick={generateEmailHtml} className="w-full bg-indigo-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all">
                Generate / Update Email
              </button>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <button onClick={() => fileInputRef.current.click()} className="w-full bg-gray-200 text-gray-800 py-2 rounded-md font-semibold hover:bg-gray-300">
                  Import CSV
                </button>
                <input type="file" ref={fileInputRef} onChange={importCSV} accept=".csv" className="hidden" />
                <button onClick={exportCSV} className="w-full bg-gray-200 text-gray-800 py-2 rounded-md font-semibold hover:bg-gray-300">
                  Export CSV
                </button>
              </div>

              {emailHtml && (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-md font-semibold text-gray-800">HTML Code</h4>
                    <button onClick={copyHtmlToClipboard} className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300">
                      {copySuccess || 'Copy HTML'}
                    </button>
                  </div>
                  <textarea className="w-full h-40 border p-2 rounded-md bg-gray-50 font-mono text-sm" value={emailHtml} readOnly />
                  
                  <h4 className="text-md font-semibold text-gray-800 mt-4 mb-2">Live Preview</h4>
                  <div className="w-full h-[1000px] border rounded-md overflow-hidden">
                    <iframe className="w-full h-full" srcDoc={emailHtml} title="Email Preview" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
