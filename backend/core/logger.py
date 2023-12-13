import datetime

class Logger:
    def log_error(self, traceback):
        with open('core/logs/error_log.txt', 'a') as file:
            file.write(f'{datetime.datetime.now()}\n')
            file.write(traceback)
            file.write('=' * 50 + '\n')