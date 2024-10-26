import pandas as pd
from transformers import Trainer, TrainingArguments, AutoModelForSequenceClassification, AutoTokenizer
from datasets import Dataset

# Указать путь к вашему датасету
dataset_path = 'path/to/your/dataset.csv'

# Загрузка и подготовка датасета
data = pd.read_csv(dataset_path)
# Предположим, ваш датасет имеет столбцы 'text' и 'label'
dataset = Dataset.from_pandas(data)

# Загружаем токенизатор и модель
model_name = 'facebook/bart-base'  # Замените на вашу модель
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name, num_labels=len(data['label'].unique()))

# Токенизация данных
def tokenize_function(examples):
    return tokenizer(examples['text'], padding="max_length", truncation=True)

tokenized_datasets = dataset.map(tokenize_function, batched=True)

# Настройки обучения
training_args = TrainingArguments(
    output_dir='./results', # Директория для сохранения модели
    evaluation_strategy="epoch",
    learning_rate=2e-5,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=16,
    num_train_epochs=3,
    weight_decay=0.01,
)

# Обучение
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets,
    eval_dataset=tokenized_datasets,
)

# Запуск обучения
trainer.train()

# Сохранение модели
model.save_pretrained('./final_model')
tokenizer.save_pretrained('./final_model')

