import requests # see https://2.python-requests.org/en/master/
 
key = 'Co7nORWHJnvP-DdRiYbjyQH-YrQRD3h9'
text = "a text"
t_title = "a_paste_title"
 
login_data = {
    'api_dev_key': key,
    'api_user_name': 'rajso167',
    'api_user_password': 'haslodoPastebin123'
    }
data = {
    'api_option': 'paste',
    'api_dev_key':key,
    'api_paste_code':text,
    'api_paste_name':t_title,
    }
 
login = requests.post("https://pastebin.com/api/api_login.php", data=login_data)
print("Login status: ", login.status_code if login.status_code != 200 else "OK/200")
print("User token: ", login.text)
data['api_user_key'] = login.text
 
r = requests.post("https://pastebin.com/api/api_post.php", data=data)
print("Paste send: ", r.status_code if r.status_code != 200 else "OK/200")
print("Paste URL: ", r.text)