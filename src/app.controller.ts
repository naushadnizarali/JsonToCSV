import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { json2csv } from 'json-2-csv';
const fs = require('fs');

const todos = [
  {
      "id": 1,
      "title": "delectus aut autem",
      "completed": false
  },
  {
      "id": 2,
      "title": "quis ut nam facilis et officia qui",
      "completed": false
  },
  {
      "id": 3,
      "title": "fugiat veniam minus",
      "completed": false
  }];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
    getCSV(): void {
      //return this.appService.getHello();
      json2csv(todos, (err, csv) => {
        if (err) {
            throw err;
        }

        // print CSV string
        console.log(csv);
    });
  }

  @Get('csv')
    downCSV(): void {
      //return this.appService.getHello();
      json2csv(todos, (err, csv) => {
        if (err) {
            throw err;
        }

        // print CSV string
        // console.log(csv);

        // write CSV to a file
        fs.writeFile('./csv/todos.csv', csv, (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        });
    });
  }
}
