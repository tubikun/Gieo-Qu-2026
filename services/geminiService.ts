import { GoogleGenAI, Type } from "@google/genai";
import { FortuneResult, UserInput } from "../types";

// Helper to safely get API key
const getApiKey = (): string => {
  const key = process.env.API_KEY;
  if (!key) {
    console.error("API_KEY is missing in environment variables.");
    return "";
  }
  return key;
};

export const generateFortune = async (user: UserInput): Promise<FortuneResult> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("Vui lòng cấu hình API Key để xin quẻ!");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Bạn là một thầy bói AI vui tính, "lầy lội" và cực kỳ bắt trend cho năm mới Bính Ngọ 2026 (Năm con Ngựa Vàng).
    Người dùng là thành viên trong hệ sinh thái AIVA (nhân viên, đối tác, khách hàng, CTV...).
    Hãy gieo một quẻ bói chi tiết cho:
    - Tên: ${user.name}
    - Ngày sinh: ${user.dob}

    Yêu cầu:
    1. Giọng điệu: Hài hước, châm biếm nhẹ, hiện đại, tích cực. Dùng từ ngữ liên quan đến "Ngựa", "Phi nước đại", "AIVA", "AI", "Công nghệ", "Chốt đơn".
    2. Phân tích RÕ RÀNG 7 khía cạnh sau (Mỗi mục 1-2 câu ngắn gọn, súc tích, gây cười):
       - Sức khỏe: (Ví dụ: Chạy deadline như ngựa nhưng nhớ ăn cỏ đúng giờ)
       - Tiền bạc: (Thu nhập, lương thưởng)
       - Tài lộc: (Vận may bất ngờ)
       - Tình duyên: (Thả thính, người yêu)
       - Công danh: (Danh tiếng, vị thế)
       - Sự nghiệp: (Công việc cụ thể)
       - AIVA: (Dự đoán liên quan đến việc hợp tác/làm việc với AIVA)
    
    3. Định dạng JSON bắt buộc.

    Ví dụ style: "Sự nghiệp: Năm nay sự nghiệp phi như ngựa Xích Thố, nhưng cẩn thận đừng để sếp cưỡi."
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Tên quẻ (Ví dụ: Quẻ Mã Đáo Thành Công, Quẻ Ngựa Chứng...)" },
            luckyNumber: { type: Type.INTEGER, description: "Con số may mắn (1-99)" },
            luckyColor: { type: Type.STRING, description: "Màu may mắn" },
            
            health: { type: Type.STRING, description: "Phán về Sức khỏe" },
            money: { type: Type.STRING, description: "Phán về Tiền bạc" },
            wealth: { type: Type.STRING, description: "Phán về Tài lộc" },
            love: { type: Type.STRING, description: "Phán về Tình duyên" },
            fame: { type: Type.STRING, description: "Phán về Công danh" },
            career: { type: Type.STRING, description: "Phán về Sự nghiệp" },
            aiva: { type: Type.STRING, description: "Phán về AIVA" },
          },
          required: ["title", "luckyNumber", "luckyColor", "health", "money", "wealth", "love", "fame", "career", "aiva"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Thần linh chưa hồi đáp (No response)");

    const result = JSON.parse(text) as FortuneResult;
    return result;

  } catch (error) {
    console.error("Error generating fortune:", error);
    return {
      title: "Quẻ Kết Nối",
      luckyNumber: 404,
      luckyColor: "Xám Disconnect",
      health: "Mạng yếu làm huyết áp tăng.",
      money: "Tiền 4G tốn kém quá.",
      wealth: "Chờ wifi chùa.",
      love: "Mất kết nối với crush.",
      fame: "Nổi tiếng vì lag.",
      career: "Đứng hình như màn hình treo.",
      aiva: "Hãy kiểm tra lại internet để AIVA độ bạn."
    };
  }
};
