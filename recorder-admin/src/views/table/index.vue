<template>
  
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getArticles } from '@/api/articles'
import { IArticleData } from '@/api/types'

@Component({
  name: 'Table',
  filters: {
    statusFilter: (status: string) => {
      const statusMap: { [key: string]: string } = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    parseTime: (timestamp: string) => {
      return new Date(timestamp).toISOString()
    }
  }
})

export default class extends Vue {
  private list: IArticleData[] = []
  private listLoading = true
  private listQuery = {
    page: 1,
    limit: 20
  }

  created () {
    this.getList()
  }

  private async getList() {
    this.listLoading = true
    const { data } = await getArticles(this.listQuery)
    this.list = data.items
    setTimeout(() => {
      this,this.listLoading = false
    }, 0.5 * 1000)
  }
}
</script>