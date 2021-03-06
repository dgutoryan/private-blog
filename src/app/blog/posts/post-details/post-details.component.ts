import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { SpinnerService } from '../../../shared/spinner/spinner.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'pb-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  post$: Observable<Post>;
  postId = this.activatedRoute.snapshot.paramMap.get('id');
  loading = false;
  isVisible = false;

  constructor(
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spinner: SpinnerService,
  ) { }

  ngOnInit() {
    this.spinner.enable();
    this.post$ = this.postsService.getPost(this.postId)
      .pipe(
        tap(() => this.spinner.disable()),
      );
  }

  deletePost() {
    this.loading = true;
    this.postsService
      .deletePost(this.postId)
      .then(() => {
        this.loading = false;
        this.router.navigate(['/posts']);
      })
      .catch(() => this.loading = false);
  }
}
