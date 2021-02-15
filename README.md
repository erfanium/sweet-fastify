# sweet-fastify

Build HTTP API much faster, cleaner and safer without losing performance

- There's no separated `req.query`, `req.params` or `req.body` objects, all of them merged into single object called  `params`
- Validator schema checker via typescript for extra safely
- Clean and safe authentication middleware handler

## Examples

This examples are used in production by me!

### Basic route

```ts
interface Request {
   phone: string
}
interface Response {
   digits: number
   code?: string
   exp: number
   next: 'login' | 'register'
}

const logger = new Logger('Code')

const mock = true

export const code = sweet({
   method: 'POST',
   url: '/users/code',
   params: {
      phone: 'phone',
   },
   async handler(params: Request): Promise<Response> {
      const user = await User.findOneByPhone(params.phone)
      const otp = await OTP.generate(params.phone)

      logger.info(params.phone, otp.code)
      await sendOTP(params.phone, otp.code)
      return {
         digits: OTP.codeDigits,
         code: mock ? otp.code : undefined,
         exp: dateToUnixTimestamp(otp.expiredAt),
         next: user ? 'login' : 'register',
      }
   },
})
```

### With authentication

```ts
interface Request {
   name: string
}

export const createBook = sweet({
   method: 'POST',
   url: '/books',
   auth: users,
   params: {
      name: 'string|max:30',
   },
   async handler(params: Request, { userID }): Promise<Book> {
      const book: Book = {
         id: oidHex(),
         v: oidHex(),
         creator: userID,
         deleted: false,
         name: params.name,
      }

      await Book.repo.insert(book)

      return book
   },
 })
 ```
