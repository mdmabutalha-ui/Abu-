async function sendMessage() {
    const inputField = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const message = inputField.value;

    if (!message) return;

    // ইউজারের মেসেজ স্ক্রিনে দেখানো
    chatBox.innerHTML += `<div><b>You:</b> ${message}</div>`;
    inputField.value = "";

    // এখানে AI-এর উত্তর আসার প্রসেস শুরু হবে
    chatBox.innerHTML += `<div id="loading"><i>Talha AI ভাবছে...</i></div>`;

    try {
        // মনে রাখবেন: সরাসরি ব্রাউজারে API Key ব্যবহার করা নিরাপদ নয়। 
        // এটি শেখার উদ্দেশ্যে। প্রফেশনাল কাজে Backend ব্যবহার করা হয়।
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY_HERE", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Your name is Talha AI. Answer this: ${message}` }] }]
            })
        });

        const data = await response.json();
        document.getElementById("loading").remove();
        const aiResponse = data.candidates[0].content.parts[0].text;
        
        chatBox.innerHTML += `<div><b>Talha AI:</b> ${aiResponse}</div>`;
    } catch (error) {
        document.getElementById("loading").innerText = "Error: API কানেক্ট হচ্ছে না!";
    }
}
