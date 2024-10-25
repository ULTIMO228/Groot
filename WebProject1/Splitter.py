def split_text_into_chunks(text, chunk_size=100):
    # Разбиваем текст на чанки определённого размера
    words = text.split()
    return [' '.join(words[i:i + chunk_size]) for i in range(0, len(words), chunk_size)]

# Разбиение запроса
def split_query_into_chunks(query, chunk_size=10):
    return split_text_into_chunks(query, chunk_size=chunk_size)
