from tornado import ioloop, web
import os, random, string, json


class BaseHandler(web.RequestHandler):
    def get(self, *args, **kwargs):
        self.write("say something")

    def set_default_headers(self, *args, **kwargs):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")


class UploadHandler(BaseHandler):
    def get(self, *args, **kwargs):
        self.write("endpoint ready for app")

    def post(self, *args, **kwargs):
        try:
            file1 = self.request.files['file'][0]
            namesArr = os.path.splitext(file1['filename'])
            name = namesArr[0]
            extension = namesArr[1]
            fname = ''.join(random.choice(string.ascii_lowercase + string.digits) for x in range(6))
            final_filename = name + fname + extension
            output_file = open("upload/" + final_filename, 'wb')
            output_file.write(file1['body'])
            self.finish({'status': 'success', 'msg': "file " + final_filename + " is uploaded"})
        except Exception as ex:
            self.finish({'status': 'failed', 'msg': ex})


class downloadHandler(BaseHandler):
    def get(self, *args, **kwargs):
        try:
            file_name = 'upload/'+'dpresumebs1dac.pdf'
            buf_size = 4096
            self.set_header('Content-Type', 'application/octet-stream')
            self.set_header('Content-Disposition', 'attachment; filename=' + file_name)
            with open(file_name, 'r') as f:
                while True:
                    data = f.read(buf_size)
                    if not data:
                        break
                    self.write(data)
            self.finish()
        except Exception as ex:
            self.finish({'status': 'failed', 'msg': ex})


class jsonTest(BaseHandler):
    def get(self, *args, **kwargs):
        self.write({'data': 'json test'})


def upload_app():
    return web.Application([
        (r"/upload", UploadHandler),
        (r"/download", downloadHandler),
        (r"/json", jsonTest),
    ], debug=True)


# /usr/local/bin/python3.9 /Users/dpadmin/deven/dpgit/web/ReactJsApp/cex_test_backend/endpoints/fileUploader.py
if (__name__ == '__main__'):
    app = upload_app()
    app.listen(8888)
    io = ioloop.IOLoop.current()
    # callback = functools.partial(connection_ready, sock)
    # io_loop.add_handler(sock.fileno(), callback, io_loop.READ)
    io.start()
