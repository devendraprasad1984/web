import tornado.ioloop
import tornado.web


class UploadHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")

def upload_app():
    return tornado.web.Application([
        (r"/upload", UploadHandler),
    ])


if __name__ == "__main__":
    app = upload_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()
