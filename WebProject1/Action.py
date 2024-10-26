from transformers.models.seamless_m4t import tokenization_seamless_m4t
from Groot import *
from Splitter import *
from Loader import load_data
from Cleaner import preprocess_text, preprocess_query

data = load_data()
tokens = preprocess_text(data)
dataset = split_text(tokens)

retriever = SearchAgent(dataset)
augmentation = AugmentationAgent()
generation = GenerationAgent()

# Имеем запрос от пользователя
user_query = str(input())
tokens_query = preprocess_query(user_query)
splitted_query = split_query(tokens_query)

# Процесс
relevant_docs = retriever.search(splitted_query)
augmented_questions = augmentation.augment(splitted_query, relevant_docs)
final_answer = generation.generate_answer(augmented_questions, relevant_docs)

# Выводим результат
print(final_answer)
