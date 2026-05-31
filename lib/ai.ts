import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

/**
 * جلب تفاصيل الفيلم وتحسين القصة باستخدام Google Gemini
 */
export async function generateMoviePlotAi(title: string, originalPlot: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `أنت خبير سينمائي محترف في موقع 'استراحة السينما'. 
    مهمتك هي إعادة كتابة ملخص الفيلم التالي باللغة العربية بأسلوب أدبي، مشوق، وفاخر.
    
    اسم الفيلم: ${title}
    القصة الأصلية: ${originalPlot}
    
    اكتب الملخص الجديد الآن:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Plot Generation Error:", error);
    return originalPlot;
  }
}

/**
 * الرد على استفسارات المستخدمين في الدردشة باستخدام Google Gemini
 */
export async function getChatAiResponse(messages: any[]) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // تحويل الرسائل لتناسب تنسيق Gemini
    const chat = model.startChat({
      history: messages.slice(0, -1).map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "عذراً، واجهت مشكلة في التفكير حالياً. هل يمكنك المحاولة مرة أخرى؟";
  }
}
