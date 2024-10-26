import os
import PyPDF2
from docx import Document
#Извлечение из pdf
def extract_text_from_pdf(pdf_path):
    text = ''
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            text += page.extract_text() + '\n'
    return text
#Извлечение из docx
def extract_text_from_docx(docx_path):
    text = ''
    doc = Document(docx_path)
    for paragraph in doc.paragraphs:
        text += paragraph.text + '\n'
    return text
#Общая функция извлечения текста из всех файлов в директории
def load_data(directory):
    data = []
    for filename in os.listdir(directory):
        if filename.endswith('.pdf'):
            text = extract_text_from_pdf(os.path.join(directory, filename))
            data.append(text)
        elif filename.endswith('.docx'):
            text = extract_text_from_docx(os.path.join(directory, filename))
            data.append(text)
    return data