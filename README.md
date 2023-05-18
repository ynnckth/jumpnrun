# Jump n' run!
*A simple jump & run platformer browser game with customized messages rendered on the map*

<img src="docs/assets/screenshot.gif" />

### Usage

The following URL query parameters control the message shown as part of the map and also the winning message:
```
?message=<your message as string or base64-encoded>
?won=<your message as string or base64-encoded>
?encoded=<should be true if the messages above are provided encoded>
```
Simply append them to the URL, for example as such: 
```
https://ynnckth.github.io/jumpnrun/?message=hello-world&won=you%20win

Or with encoded messages: 
https://ynnckth.github.io/jumpnrun/?message=aGVsbG8td29ybGQ=&won=eW91IHdpbg==&encoded=true
```

For encoding a message you can use any online base64 encoder, for example:
> https://www.base64encode.org/

Use in conjunction with a QR-code generator like:
> https://www.qr-code-generator.com/
