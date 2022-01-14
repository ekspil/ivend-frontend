<template>
  <button class="btn btn-primary" type="button" @click.prevent="requestExcel"><i
    class="fe fe-download"> {{ text }}</i>
  </button>
</template>

<script>
import gql from 'graphql-tag';

import { and, not, isEmpty } from 'ramda';

export default {
  name: 'ExportExcel',
  props: {
    table: {
      type: Object,
      default: () => ({
        headers: [],
        fields: []
      })
    },
    text: {
      type: String,
      default: () => {
        return "Экспорт"
      }
    }
  },
  methods: {
    async requestExcel () {
      const { headers, fields } = this.table;
      const rows = [
        // init table headers
        { cells: [] }
      ];

      headers.forEach(header => {
        // rows[0] - table headers
        rows[0].cells.push(header.name);
      });

      // fields.forEach(field => {
      //   rows.push({
      //     cells: headers.map(header => String(JSON.stringify(field[header.key])))
      //   });
      // }); let text = news.text.replace( /(<([^>]+)>)/ig, `` )
      fields.forEach(field => {

        rows.push({
          cells: headers.map(header => {
            if(typeof (field[header.key]) === "string"){
              return field[header.key].replace( /(<([^>]+)>)/ig, `` )
            }
            if(typeof (field[header.key]) === "number" && field[header.key] > 1536202081000){
              return new Date(field[header.key]).toLocaleString()
            }
            return field[header.key]
          })
        });
      });

      const { errors, data } = await this.$apollo.mutate({
        mutation: gql`
          mutation ($input: GenerateExcelInput!) {
            generateExcel (input: $input) {
              url
            }
          }
        `,
        variables: {
          input: { rows }
        }
      });

      const excelUrl = data.generateExcel.url;
      if (and(errors, not(isEmpty(errors)) || not(excelUrl))) {
        return console.error('Произошла серверная ошибка.');
      }

      window.open(excelUrl, '_blank');
    }
  }
}
</script>
