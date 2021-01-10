<template>
 <div class="home-page">
  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">
      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item" v-if="user">
              <nuxt-link class="nav-link disabled" :to="{
                name:'home',
                query:{
                  tab:'your_feed'
                }
              }"
              :class="{active: tab === 'your_feed'}">Your Feed</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" 
              :to="{name:'home',
              query:{
                tab:'global_feed'
              }
              }"
              :class="{active:tab === 'global_feed'}">Global Feed</nuxt-link>
            </li>
            <li class="nav-item" v-if="tag">
              <nuxt-link class="nav-link" 
              :to="{name:'home',
              query:{
                tab:'tag',
                tag:tag
              }
              }"
              :class="{active:tab === 'tag'}">#{{tag}}</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="article-preview"
        v-for="article in articles"
        :key="article.slug">
          <div class="article-meta">
            <nuxt-link :to="{
              name:'profile',
              params:article.author.username
            }
              "><img :src="article.author.image" /></nuxt-link>
            <div class="info">
              <nuxt-link :to="{
              name:'profile',
              params:article.author.username}" class="author">
              {{article.author.username}}</nuxt-link>
              <span class="date">{{article.createdAt}}</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right"
            :class="{active:article.favorited}">
              <i class="ion-heart"></i> {{article.favoritesCount}}
            </button>
          </div>
          <nuxt-link :to="{
            name:'article',
            params:{
              slug:article.slug
            }

          }" class="preview-link">
            <h1>{{article.title}}</h1>
            <p>{{article.description}}</p>
            <span>Read more...</span>
          </nuxt-link>
        </div>

      </div>
      <nav>
        <ul class="pagination">
          <li class="page-item" v-for="count in totalPage" :key="count" :class="{active:count === page}">
            <nuxt-link class="page-link" :to="{
              name:'home',
              query:{
                page:count,
                tag:$route.query.tag
              }
            }">
                {{count}}
            </nuxt-link>
          </li>
        </ul>
      </nav>
      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <nuxt-link
             :to="{
              name:'home',
              query:{tag:tag,
              tab:'tag'}
              }"
               class="tag-pill tag-default"
            v-for="tag in tags"
            :key="tag"
            >{{tag}}</nuxt-link>
            
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import {getArticles} from "@/api/articles.js"
import {getTags} from "@/api/tags.js"
import {mapState} from 'vuex'
export default {
    name: "homePage",
   async asyncData ({query}) { 
     const page = Number.parseInt(query.page || 1)
     const limit = 10
     const {tag} = query
     const [articlesRes,tagsRes] = Promise.all([
       await getArticles({
       tag,
       limit,
       offset: (page-1) * limit
     }) ,
      await getTags()
     ])
    const {articles,articlesCount} = articlesRes.data
    const {tags } = tagsRes.tags
     return {
       articles,
       articlesCount,
       tags,
       limit,
       page,
       tag,
       tab:query.tab
     }
      },
      computed:{
        mapState:['user'],
        totalPage(){
            return Math.ceil(this.articlesCount/this.limit)
        }
      },
      watchQuery:['page', 'tag', 'tab'],


}
</script>

<style>

</style>