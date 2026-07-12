import pdfParse from "pdf-parse/lib/pdf-parse.js";
import mammoth from "mammoth";

/**
 * Extracts plain text from an uploaded resume file buffer.
 * Supports PDF and DOCX.
 */
export const extractText = async (buffer, mimetype) => {
  if (mimetype === "application/pdf") {
    const data = await pdfParse(buffer);
    return data.text.trim();
  }

  if (
    mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value.trim();
  }

  throw new Error("Unsupported file type");
};
