from tornado import ioloop, web


class UploadHandler(web.RequestHandler):
    def get(self):
        self.write("Hello, world")


def upload_app():
    return web.Application([
        (r"/upload", UploadHandler),
    ])

# /usr/local/bin/python3.9 /Users/dpadmin/deven/dpgit/web/ReactJsApp/cex_test_backend/endpoints/fileUploader.py
app = upload_app()
app.listen(8888)
io = ioloop.IOLoop.current()
# callback = functools.partial(connection_ready, sock)
# io_loop.add_handler(sock.fileno(), callback, io_loop.READ)
io.start()
