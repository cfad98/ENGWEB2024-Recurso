import json

def clean_list_field(field):
    if isinstance(field, str):
        field = field.strip()
        if field.startswith('[') and field.endswith(']'):
            try:
                return json.loads(field.replace("'", '"'))
            except json.JSONDecodeError:
                pass
    return field

def clean_numeric_field(field, default=0, numeric_type=int):
    try:
        return numeric_type(field)
    except (ValueError, TypeError):
        return default

def clean_dataset(file_path, output_path):
    cleaned_data = []
    current_object = ""
    inside_object = False

    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    for line in lines:
        line = line.strip()
        if line == '[' or line == '],':
            continue
        elif line == '],':
            current_object += ']'
        elif line.startswith('{'):
            inside_object = True
            current_object = line
        elif line.endswith('}') or line.endswith('},'):
            current_object += line
            inside_object = False
            try:
                book = json.loads(current_object.rstrip(','))
                book['bookId'] = book.get('bookId', '').strip()
                book['genres'] = clean_list_field(book.get('genres', ''))
                book['characters'] = clean_list_field(book.get('characters', ''))
                book['author'] = [author.strip() for author in book.get('author', '').split(",")]
                book['title'] = book.get('title', '').strip()
                book['description'] = book.get('description', '').strip()
                book['awards'] = clean_list_field(book.get('awards', ''))
                book['ratingsByStars'] = [clean_numeric_field(rating, numeric_type=int) for rating in clean_list_field(book.get('ratingsByStars', ''))]
                book['setting'] = clean_list_field(book.get('setting', ''))
                book['rating'] = clean_numeric_field(book.get('rating', 0.0), numeric_type=float)
                book['pages'] = clean_numeric_field(book.get('pages', 0), numeric_type=int)
                book['numRatings'] = clean_numeric_field(book.get('numRatings', 0), numeric_type=int)
                book['likedPercent'] = clean_numeric_field(book.get('likedPercent', 0), numeric_type=int)
                book['bbeScore'] = clean_numeric_field(book.get('bbeScore', 0), numeric_type=int)
                book['bbeVotes'] = clean_numeric_field(book.get('bbeVotes', 0), numeric_type=int)
                book['price'] = clean_numeric_field(book.get('price', 0.0), numeric_type=float)
                cleaned_data.append(book)
            except json.JSONDecodeError:
                print(f"Skipping invalid JSON object: {current_object}")
            current_object = ""
        elif inside_object:
            current_object += line

    with open(output_path, 'w', encoding='utf-8') as file:
        json.dump(cleaned_data, file, ensure_ascii=False, indent=2)

if __name__ == '__main__':
    input_path = 'dataset.json'
    output_path = 'cleaned_dataset.json'
    clean_dataset(input_path, output_path)

