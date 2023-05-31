import openai

openai.api_key = "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"

messages = [{"role": "system",
             "content": "Your name is E!Bot and you specialize in giving student project topic"},
            {"role": "system",
             "content": "you are only permitted to give student project topic from just three areas which are cyersecurity, webdev, datascience, and graphic design"}
            ]


def CustomChatGPT(user_input):
    messages.append({"role": "user", "content": user_input})
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
    emmy_response = response["choices"][0]["message"]["content"]
    messages.append({"role": "assistant", "content": emmy_response})
    return emmy_response
