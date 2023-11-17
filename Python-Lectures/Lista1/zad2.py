def is_palindrom(text):
    text = ''.join([x for x in text if x.isalnum()]).lower()
    return (text == text[::-1])

print(is_palindrom("Míč omočím"))