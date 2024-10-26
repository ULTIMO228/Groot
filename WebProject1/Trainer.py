import pandas as pd
from transformers import Trainer, TrainingArguments, AutoModelForSequenceClassification, AutoTokenizer
from datasets import Dataset

# ������� ���� � ������ ��������
dataset_path = 'path/to/your/dataset.csv'

# �������� � ���������� ��������
data = pd.read_csv(dataset_path)
# �����������, ��� ������� ����� ������� 'text' � 'label'
dataset = Dataset.from_pandas(data)

# ��������� ����������� � ������
model_name = 'facebook/bart-base'  # �������� �� ���� ������
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name, num_labels=len(data['label'].unique()))

# ����������� ������
def tokenize_function(examples):
    return tokenizer(examples['text'], padding="max_length", truncation=True)

tokenized_datasets = dataset.map(tokenize_function, batched=True)

# ��������� ��������
training_args = TrainingArguments(
    output_dir='./results', # ���������� ��� ���������� ������
    evaluation_strategy="epoch",
    learning_rate=2e-5,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=16,
    num_train_epochs=3,
    weight_decay=0.01,
)

# ��������
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets,
    eval_dataset=tokenized_datasets,
)

# ������ ��������
trainer.train()

# ���������� ������
model.save_pretrained('./final_model')
tokenizer.save_pretrained('./final_model')

