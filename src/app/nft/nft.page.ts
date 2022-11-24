import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { collection } from 'firebase/firestore';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.page.html',
  styleUrls: ['./nft.page.scss'],
})
export class NftPage implements OnInit {
  public nftList;
  constructor(
    private router: Router,
    private fireStore:  Firestore
  ) { }

  ngOnInit() {
    this.getNFTs();
  }

  addElement(){
    this.router.navigate(['nft/add']);
  }

  getNFTs(){
    const list = collection(this.fireStore, 'nfts');
    this.nftList = collectionData(list);
  }
}
