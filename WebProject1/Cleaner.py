import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer


nltk.download('stopwords')
nltk.download('punkt')
nltk.download('wordnet')

def preprocess_text(text):
    # Приведение к нижнему регистру
    text = text.lower()
    
    # Токенизация
    tokens = nltk.word_tokenize(text)
    
    # Удаление стоп-слов
    stop_words = set(stopwords.words('russian'))
    tokens = [word for word in tokens if word not in stop_words]
    
    # Лемматизация
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(word) for word in tokens]
    
    # Объединяем токены обратно в строку
    cleaned_text = ' '.join(tokens)
    return cleaned_text
def preprocess_query(query):
    # Приведение к нижнему регистру
    query = query.lower()
    
    # Токенизация
    tokens = nltk.word_tokenize(query)
    
    # Удаление стоп-слов
    stop_words = set(stopwords.words('russian'))
    tokens = [word for word in tokens if word not in stop_words]
    
    # Лемматизация
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(word) for word in tokens]
    
    # Объединяем токены обратно в строку
    cleaned_query = ' '.join(tokens)
    return cleaned_query
