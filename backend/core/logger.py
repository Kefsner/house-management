import datetime

class Logger:
    def log_tracebak(self, traceback):
        with open('core/logs/error_log.txt', 'a') as file:
            file.write("Traceback:\n")
            file.write(f'{datetime.datetime.now()}\n')
            file.write(traceback)
            file.write('=' * 50 + '\n')

    def log_serializer_errors(self, errors):
        with open('core/logs/error_log.txt', 'a') as file:
            file.write("Serializer Errors:\n")
            file.write(f'{datetime.datetime.now()}\n')
            file.write(str(errors))
            file.write('=' * 50 + '\n')