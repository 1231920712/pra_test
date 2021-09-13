import logging
import os
import re
import pdfplumber

class extract_pdf(object):
    def get_pdf(isText=True):
        pdf_content = ''
        for _ in range(3):
            try:
                local_dir = os.getcwd()
                print("local_dir: " + local_dir)
                file_name = '{}/RVP.pdf'.format(local_dir)
               
                pdf = pdfplumber.open(file_name)
                pages = pdf.pages[55:452]
                page_num = 0
                file_obj = []
                for page in pages:
                    page_num += 1
                   
                    if isText:
                        txt_tmp = page.extract_text()
                        if txt_tmp:
                            pdf_content += txt_tmp
                        else:
                            for table in page.extract_tables():
                                for row in table:
                                    rows = []
                                    for col in row:
                                        rows.append(re.sub('\n', '', str(col)))
                                    file_obj.append(rows)
                    if not isText:  
                        return file_obj

                # pdf.close()
                # os.remove(file_name)  
                return pdf_content
            except Exception as e:
                logging.error('{}'.format(e))
        return ''
if __name__ == '__main__':
    epdf = extract_pdf()
    x = epdf.get_pdf()
    print(x)
    x = x.split('\n')
    print(x)
