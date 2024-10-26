from transformers import pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Агент 1: Поиск и извлечение релевантной информации
class SearchAgent:
    def __init__(self, dataset):
        self.dataset = dataset

    def search(self, query, top_n=5):
        query_vector = self.vectorizer.transform([query])
        similarities = cosine_similarity(query_vector, self.document_matrix).flatten()
        indices = np.argsort(similarities)[::-1][:top_n]
        
        results = []
        for index in indices:
            results.append((self.documents[index], similarities[index]))
        return results

# Агент 2: Дополнение запроса
class AugmentationAgent:
    def augment(self, query, documents):
        augmented_questions = []
        for doc in documents:
            augmented_questions.append(f"{query} В связи с {doc}")
        return augmented_questions

# Агент 3: Генерация ответа
class GenerationAgent:
    def __init__(self):
        self.generator = pipeline("text2text-generation", model="ai-forever/ruGPT-3.5-13B")

    def generate_answer(self, questions, documents):
        inputs = [f"{q} {doc}" for q, doc in zip(questions, documents)]
        outputs = self.generator(inputs)
        return [output['generated_text'] for output in outputs]

