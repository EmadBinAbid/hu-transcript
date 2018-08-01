import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Title, Position, Kind } from '../../../interfaces/formFields';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'hut-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.scss']
})
export class CampusComponent implements OnInit {
  @Input() group: FormGroup;
  @Output() eventRemoved = new EventEmitter<any>();

  isRequired: boolean;
  uploadedFileName: string = "No file choosen";
  
  constructor() {
  }

  onFileChange(event, entryIndex, category) {
    if(event.target.files && event.target.files.length) {
      const file = event.target.files;
      category.controls[entryIndex].controls['image'].setValue(file[0]);
      this.uploadedFileName = file[0].name;
      this.isRequired = false;
    }
    else
    {
      this.uploadedFileName = "No file choosen";
      this.isRequired = true;
    }
  }

  removeEvent(index, category) {
    const currentEntry = {
      index,
      category
    }
    this.eventRemoved.emit(currentEntry);
  }

  get campusCategory(): FormArray {
    return this.group.get('campusCategory') as FormArray;
  };

  onTitleChange(event, entryIndex, category) {
    if(event.target.value && event.target.value.length) {
      const text = event.target.value;
      category.controls[entryIndex].controls['title'].setValue(text);
    }
  }

  onPositionChange(event, entryIndex, category) {
    if(event.target.value && event.target.value.length) {
      const text = event.target.value;
      category.controls[entryIndex].controls['position'].setValue(text);
    }
  }

  onKindChange(event, entryIndex, category) {
    if(event.target.value && event.target.value.length) {
      const text = event.target.value;
      category.controls[entryIndex].controls['kind'].setValue(text);

      if(text === "Internal")
      {
        this.isRequired = false;
      }
      else
      {
        this.isRequired = true;
      }
    }
  }

  titleList: Title[] = [
    { title: "1-1 Mentor Program" },
    { title: "A Talk with DG Rangers Sindh" },
    { title: "A Talk with Shaukat Dhanani" },
    { title: "ADA-Concert & DJ Set" },
    { title: "Akhuwat" },
    { title: "An Afternoon with Anila Soomro by WICSE" },
    { title: "Association for Computing Machinery" },
    { title: "Bazm-e-Adab feature Events" },
    { title: "Bazm-e-Aqeedat" },
    { title: "Biology Meets Society Talk" },
    { title: "Clinostat Session by Dr. Tim Spraklen" },
    { title: "Club Retreat, Youth Impact" },
    { title: "Coders Meet" },
    { title: "Color Week" },
    { title: "Computational Biology Workshop" },
    { title: "Computational Thinking Programming Workshop" },
    { title: "Computer Science BootCamp" },
    { title: "Dance Off" },
    { title: "Desi Sports Day" },
    { title: "Design Intensive Workshop" },
    { title: "Drum Circle" },
    { title: "Eid Gala" },
    { title: "Elements of Computing System Support Workshop" },
    { title: "Engage for Education, TCF Awards" },
    { title: "Engaging on Gender socialization & Empowerment" },
    { title: "Expression Day" },
    { title: "Golden Night" },
    { title: "Gratitude day" },
    { title: "Heer Ranjha" },
    { title: "Hour of Code" },
    { title: "HU Act of Kindness" },
    { title: "HU Anti-Bullying Campaign" },
    { title: "HU Arzu Anthropology" },
    { title: "HU Basant" },
    { title: "HU Basketball Team" },
    { title: "HU Chai & Guftugu" },
    { title: "HU Choir" },
    { title: "HU Con" },
    { title: "HU Concert" },
    { title: "HU Cricket Team" },
    { title: "HU Documentary- A Day in the Life of HU Lion" },
    { title: "HU End of Semester Party" },
    { title: "HU Etymology Workshop" },
    { title: "HU First Aid Training" },
    { title: "HU Gumby Concert" },
    { title: "HU Halloween" },
    { title: "HU Heer Ranjha" },
    { title: "HU History Project" },
    { title: "HU Icecream Social" },
    { title: "HU IEEE Extreme Competition" },
    { title: "HU Karachi Escape" },
    { title: "HU Kashf-Student Literart Magazine" },
    { title: "HU Mohsineen Dinner" },
    { title: "HU Mulaaqat-Student Led Talk Series" }, 
    { title: "HU Post-Colonial Higher Education" },
    { title: "HU Public Speaking Society Debating Competition" },
    { title: "HU Runway Radio Jockey" },
    { title: "HU Road to Graduation" },
    { title: "HU Saqafati Mela" },
    { title: "HU Sports Olympiad" },
    { title: "HU Transfer of Gavel" },
    { title: "HU Two Musketeers" },
    { title: "HU Volleyball Team" },
    { title: "HU Week of Welcome, Student Life" },
    { title: "HU Women in Science and Engineering" },
    { title: "HU Writing Short Stories" },
    { title: "HUDC by HUPSC" },
    { title: "Human Chess" }, 
    { title: "Human Library" },
    { title: "HUMUN" },
    { title: "Importance of Big data and Bit coins in the 21st century" },
    { title: "Kahwa khana" },
    { title: "Karachi Scape" },
    { title: "Karaoke by HU Anime Club" },
    { title: "Kashf-HU Student Literary Magazine" },
    { title: "Lean Engineering Workshop" },
    { title: "Let's Get Physical" },
    { title: "Lunch with Domestic Staff-HU SerVe Club" },
    { title: "Manto Play" },
    { title: "Maple Workshop by MapleSoft" },
    { title: "Mehfil-e-Daastan Goi" },
    { title: "Mehfil-e-Noor" }, 
    { title: "Meet & Greet" },
    { title: "Meritorious Awards Ceremony" },
    { title: "Movie Screening by AIR" },
    { title: "Movie Screening-Manto" },
    { title: "Movie Trivia" },
    { title: "Nature Inspired Computing Talk" },
    { title: "Nawroz Celebrations" },
    { title: "Nestle Healthy Women Competition" },
    { title: "New Student Orientation" },
    { title: "Obituary for Stephan Hawking" },
    { title: "Omicron by Aspire" },
    { title: "Open Mic" },
    { title: "Orientation Parent's Night" },
    { title: "Overnight Retreat" }, 
    { title: "Patterns Language of Programs (PLoP)" },
    { title: "Photo walk" },
    { title: "Photoshop & Illustration workshop by Arts Society & Brain.Hack()" },
    { title: "Pinktober Breat Cancer Awareness" },
    { title: "Pinktober (Bake Sale)" },
    { title: "Plant Ahead" },
    { title: "Plantation Activity-Habib Wall" },
    { title: "Play: Bijli, Pyaar or Abba Jaan" },
    { title: "Playground Workshop" },
    { title: "Poori & Pajama" },
    { title: "Ramaq" },
    { title: "Reading Gustakh" },
    { title: "Redesigning Pedestrian Safety Procedures" },
    { title: "Retro Theme Party" }, 
    { title: "Rung-o-Bayan" },
    { title: "Sangat" },
    { title: "Sapat Beach Trip" },
    { title: "Saqafati Mela" },
    { title: "Shaam – e – Jaun Elia" },
    { title: "Silk Route Writer Workshop" },
    { title: "Sindhi Culture Day" },
    { title: "Soch K Bol: Talk on Gender Pronouns and Inclusiveness" },
    { title: "Splash" },
    { title: "Stargazing in Collabration with SUPARCO" },
    { title: "Student Faculty Debate" },
    { title: "Student Lounge Committee" },
    { title: "Support Workshop for CS Students" },
    { title: "Talk on Feminism and Promotion of Verna" }, 
    { title: "TEDx HU" },
    { title: "The Century of Upheavel- A European Film Festival" },
    { title: "Throwball Competition" },
    { title: "Traffic Signal Campaign with Gender Inclusivity" },
    { title: "Transfer of Gavel" },
    { title: "Treasure Hunt" },
    { title: "Tug of War" },
    { title: "Ulat Phulat Day" },
    { title: "Winter Wonderland" },
    { title: "Women in Journalism" }
  ];

  positionList: Position[] = [
    { position: "Actor" },
    { position: "Core Member" },
    { position: "Designer" },
    { position: "DJ" },
    { position: "Editor" },
    { position: "Event Director" },
    { position: "Event Head" },
    { position: "Facilitator" },
    { position: "Founder" },
    { position: "Moderator" },
    { position: "Organizer" },
    { position: "Orientation Leader" }, 
    { position: "Performer" },
    { position: "Photographer" },
    { position: "Runnerup" },
    { position: "Speaker" },
    { position: "Trainer" },
    { position: "Usher" },
    { position: "Vocalist" },
    { position:  "Volunteer" },
    { position: "Winner" }
  ];

  kindList: Kind[] = [
    { kind: "Internal" },
    { kind: "External" }
  ];

  titleControl = new FormControl();
  titleFilteredOptions: Observable<Title[]>;

  positionControl = new FormControl();
  positionFilteredOptions: Observable<Position[]>;

  kindControl = new FormControl();
  kindFilteredOptions: Observable<Kind[]>;

  ngOnInit() 
  {
    this.titleFilteredOptions = this.titleControl.valueChanges
      .pipe(
        startWith<string | Title>(''),
        map(value => typeof value === 'string' ? value : value.title),
        map(title => title ? this._filterTitle(title) : this.titleList.slice())
      );

    this.positionFilteredOptions = this.positionControl.valueChanges
      .pipe(
        startWith<string | Position>(''),
        map(value => typeof value === 'string' ? value : value.position),
        map(position => position ? this._filterPosition(position) : this.positionList.slice())
      );

    this.kindFilteredOptions = this.kindControl.valueChanges
      .pipe(
        startWith<string | Kind>(''),
        map(value => typeof value === 'string' ? value : value.kind),
        map(kind => kind ? this._filterKind(kind) : this.kindList.slice())
      );
  }

  private _filterTitle(category: string): Title[] {
    const filterValue = category.toLowerCase();
    return this.titleList.filter(option => option.title.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterPosition(category: string): Position[] {
    const filterValue = category.toLowerCase();
    return this.positionList.filter(option => option.position.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterKind(category: string): Kind[] {
    const filterValue = category.toLowerCase();
    return this.kindList.filter(option => option.kind.toLowerCase().indexOf(filterValue) === 0);
  }

}
