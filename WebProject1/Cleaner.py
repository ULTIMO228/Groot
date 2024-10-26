import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer


nltk.download('stopwords')
nltk.download('punkt')
nltk.download('wordnet')

def preprocess_text(text):
    # ���������� � ������� ��������
    text = text.lower()
    
    # �����������
    tokens = nltk.word_tokenize(text)
    
    # �������� ����-����
    stop_words = set(stopwords.words('russian'))
    tokens = [word for word in tokens if word not in stop_words]
    
    # ������������
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(word) for word in tokens]
    
    # ���������� ������ ������� � ������
    cleaned_text = ' '.join(tokens)
    return cleaned_text
def preprocess_query(query):
    # ���������� � ������� ��������
    query = query.lower()
    
    # �����������
    tokens = nltk.word_tokenize(query)
    
    # �������� ����-����
    stop_words = set(stopwords.words('russian'))
    tokens = [word for word in tokens if word not in stop_words]
    
    # ������������
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(word) for word in tokens]
    
    # ���������� ������ ������� � ������
    cleaned_query = ' '.join(tokens)
    return cleaned_query
