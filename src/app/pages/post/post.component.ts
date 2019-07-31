import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { Post } from 'src/app/models/post';
import { Router } from '@angular/router';
import { StaticRoutes } from 'src/app/routes/static-routes';
import { ToastrService } from 'ngx-toastr';
import { PostText } from 'src/app/text/post.text';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(
    private postService: PostService,
    private router: Router,
    private toastrService: ToastrService
    ) { }
  loading: boolean = true;
  posts: Post[];
  displayPosts: Post[];

  ngOnInit() {
    const posts = this.postService.getPosts();
    if (posts instanceof Array) {
      this.setupPosts(posts);
      this.loading = false;
    } else {
      posts.subscribe(postArray => {
          this.setupPosts(postArray);
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.toastrService.error(PostText.failedPostsLoad);
        });
    }
  }

  private setupPosts(posts: Post[]): void {
    this.posts = posts;
    this.displayPosts = posts;
  }

  onGameChange(gameId: number): void {
    if (gameId === 0) {
      this.displayPosts = this.posts;
      return;
    }

    this.displayPosts = this.posts.filter(post => post.gameId === gameId);
  }

  createPost() {
    this.router.navigate([`/${StaticRoutes.createPost}`]);
  }
}
