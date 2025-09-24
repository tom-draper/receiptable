# Receiptable API

An ultra-realistic receipt generator.

Outputs <b>PNG</b>, <b>JPEG</b>, <b>PDF</b>, and raw <b>HTML</b> with inline styling. Easily embedded into any website or email.

<div align="center">
  <img src="https://github.com/user-attachments/assets/2119d544-b54a-4590-99c4-d9a0d75eadac" />
</div>

## Getting Started

It's as simple as...

```js
const receiptData = {
    template: 'default',
    output: 'html',
    content: {
        ...
    }
};

fetch('https://receiptable.dev/api/v1/receipt', {
    method: 'POST',
    headers: {
        'X-AUTH-TOKEN': 'YOUR_API_KEY',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(receiptData),
})
    .then((response) => response.text())
    .then((html) => {
        console.log(html);
    })
    .catch((error) => console.error(error));
```

Visit <a href="https://receiptable.dev/sign-up">receiptable.dev/sign-up</a> to generate your API key.

Check out the <a href="https://receiptable.dev/docs">docs</a> for more information.

## Contributions

Contributions, issues and feature requests are welcome.

- Fork it (https://github.com/tom-draper/receiptable)
- Create your feature branch (`git checkout -b my-new-feature`)
- Commit your changes (`git commit -am 'Add some feature'`)
- Push to the branch (`git push origin my-new-feature`)
- Create a new Pull Request

<div align="center">
  Built with Deno 🦖
</div>
