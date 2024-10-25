import random
from transformers import RagTokenizer, RagSequenceForGeneration, AutoModelForSeq2SeqLM

# ����� 1: ����� � ���������� ����������� ����������
class SearchAgent:
    def __init__(self, dataset):
        self.dataset = dataset

    def search(self, query):
        # � ������ ������� ������ �������� ��������� ������� �� ������ ������
        relevant_docs = random.sample(self.dataset, 2)  # ���������� ��� ��������� ������
        return relevant_docs

# ����� 2: ���������� �������
class AugmentationAgent:
    def augment(self, query, documents):
        augmented_questions = []
        for doc in documents:
            augmented_questions.append(f"{query} � ����� � {doc}")
        return augmented_questions

# ����� 3: ��������� ������
class GenerationAgent:
    def __init__(self):
        self.tokenizer = RagTokenizer.from_pretrained("facebook/rag-sequence-nq")
        self.model = RagSequenceForGeneration.from_pretrained("facebook/rag-sequence-nq")

    def generate_answer(self, questions, documents):
        input_dict = self.tokenizer.prepare_seq2seq_batch(questions, documents, return_tensors="pt", padding=True)
        output = self.model.generate(input_ids=input_dict['input_ids'], attention_mask=input_dict['attention_mask'])
        return self.tokenizer.batch_decode(output, skip_special_tokens=True)

# ������ �������������

# ��������� ��� ����� ������ (��������, �� CSV ��� JSON)


retriever = SearchAgent(dataset)
augmentation = AugmentationAgent()
generation = GenerationAgent()

# ����� ������ �� ������������
user_query = str(input())

# �������
relevant_docs = retriever.search(user_query)
augmented_questions = augmentation.augment(user_query, relevant_docs)
final_answer = generation.generate_answer(augmented_questions, relevant_docs)

# ������� ���������
print(final_answer)
