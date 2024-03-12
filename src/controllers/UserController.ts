export class UserController {
  static login(req, res) {
    const data = [
      {
        nem: "thiettruong",
        pass: "123456",
      },
    ];
    console.log("123");
    return res.status(200).send(req.body);
  }
  static test1(req, res, next) {
    (req as any).msg = "This is msg";
    next();
  }
  static test2(req, res) {
    return res.send((req as any).msg);
  }
}
