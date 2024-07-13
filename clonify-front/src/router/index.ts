import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BrowseView from '@/views/BrowseView.vue'
import AlbumDetailView from '@/views/itemViews/AlbumDetailView.vue'
import ArtistDetailView from '@/views/itemViews/ArtistDetailView.vue'
import PlaylistDetailView from '@/views/itemViews/PlaylistDetailView.vue'
import ShowDetailView from '@/views/itemViews/ShowDetailView.vue'
import TrackDetailView from '@/views/itemViews/TrackDetailView.vue'
import UnknownView from '@/views/UnknownView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/browse',
    name: 'browse',
    component: BrowseView,
    props: true
  },
  {
    path: '/album/:id',
    name: 'album',
    component: AlbumDetailView,
    props: true
  },
  {
    path: '/artist/:id',
    name: 'artist',
    component: ArtistDetailView,
    props: true
  },
  {
    path: '/playlist/:id',
    name: 'playlist',
    component: PlaylistDetailView,
    props: true
  },
  {
    path: '/show/:id',
    name: 'show',
    component: ShowDetailView,
    props: true
  },
  {
    path: '/track/:id',
    name: 'track',
    component: TrackDetailView,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'unknown',
    component: UnknownView
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
